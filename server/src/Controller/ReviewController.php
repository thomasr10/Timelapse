<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\MediaService;
use App\Service\UserMediaService;
use App\Service\ReviewService;
use App\Service\UserActivityService;

#[Route('/api/review')]
final class ReviewController extends AbstractController
{   
    public function __construct(
        private MediaService $mediaService, 
        private ReviewService $reviewService, 
        private UserMediaService $userMediaService,
        private UserActivityService $userActivityService
    ){}

    #[Route('/add', name: 'app_review_add', methods: ['POST'])]
    public function add(Request $request): JsonResponse
    {      
        $user = $this->getUser();
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé'
            ]);
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data["content"], $data["tmdb"], $data["type"])) {
            return $this->json([
                'message' => 'Données manquantes'
            ], 400);
        }

        $media = $this->mediaService->findOrCreate($data["tmdb"], $data["type"]);
        $userMedia = $this->userMediaService->findOrCreate($user, $media);
        $review = $this->reviewService->create($data["content"], $media, $user);
        
        // User activity
        $this->userActivityService->createReviewActivity("review", $review, $user, $media, $userMedia);

        return $this->json([
            'message' => 'Review créée avec succès',
            'results' => null
        ]);
    }

    #[Route('/{type}/{tmdb}/{offset}', name: 'app_review_media', methods: ['GET'])]
    public function getMediaReviews(string $type, string $tmdb, string $offset): JsonResponse
    {
        $tmdbId = intval($tmdb);
        $offsetNumber = intval($offset);

        $media = $this->mediaService->findOrCreate($tmdbId, $type);
        $reviews = $this->reviewService->getReviews($media, $offset);

        if(!$reviews) {
            return $this->json([
                "message" => "Aucune review",
                "results" => null
            ]);
        }

        $reviewsArray = [];

        foreach($reviews as $review) {
            $user = $review->getUser();
            $userMedia = $this->userMediaService->findOrCreate($user, $media);

            $reviewsArray[] = [
                "id" => $review->getId(),
                "content" => $review->getContent(),
                "created_at" => $review->getCreatedAt(),
                "user" => [
                    "id" => $user->getId(),
                    "username" => $user->getUsername(),
                    "display_username" => $user->getDisplayUsername(),
                    "profile_picture" => $user->getProfilePicture()
                ],
                "media" => [
                    "id" => $media->getId(),
                    "tmdb" => $media->getTmdbId(),
                    "type" => $media->getType()
                ],
                "user_media" => [
                    "id" => $userMedia->getId(),
                    "is_liked" => $userMedia->isLiked(),
                    "rating" => $userMedia->getRating()
                ]
            ];
        }

        return $this->json([
            "message" => "Reviews récupérées avec succès",
            "results" => $reviewsArray
        ]);
    }
}
