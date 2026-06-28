<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Service\UserMediaService;
use App\Service\MediaService;
use App\Service\UserActivityService;

#[Route('/api/user_media')]
final class UserMediaController extends AbstractController
{   

    public function __construct(
        private UserMediaService $userMediaService,
        private MediaService $mediaService,
        private UserActivityService $userActivityService
    ){}

    #[Route('/{type}/{tmdb_id}', name: 'app_user_media', methods: ['GET'])]
    public function getUserMediaData(string $type, string $tmdb_id): JsonResponse
    {       
        $tmdb = intval($tmdb_id);
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé',
                'results' => null
            ], 404);
        }

        $media = $this->mediaService->findMedia($tmdb, $type);

        if (!$media) {
            return $this->json([
                'message' => 'Media non trouvé',
                'results' => null
            ],);
        }

        $user_media = $this->userMediaService->findUserMedia($user, $media);

        if (!$user_media) {
            return $this->json([
                'message' => 'L\'utilisateur n\'a pas d\'interaction avec le media',
                'results' => null
            ],);
        }
        

        return $this->json([
            'message' => 'User Media entity trouvée',
            'results' => [
                "id" => $user_media->getId(),
                "is_liked" => $user_media->isLiked(),
                "is_watched" => $user_media->isWatched(),
                "rating" => $user_media->getRating(),
                "watched_at" => $user_media->getWatchedAt()
            ],
        ]);
    }

    #[Route('/like', name: 'app_like_media', methods: ["POST"])]
    public function like(Request $request): JsonResponse
    {   
        $user = $this->getUser();
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé'
            ]);
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data["isLiked"], $data["tmdb"], $data["type"])) {
            return $this->json([
                'message' => 'Données manquantes'
            ], 400);
        }

        // FindOrCreateMedia(id_media)
        $media = $this->mediaService->findOrCreate($data["tmdb"], $data["type"]);
        // FindOrCreateUserMedia(id_user, id_media)
        $userMedia = $this->userMediaService->findOrCreate($user, $media);
        // changer property is_liked dans user_media + property is_watched
        $this->userMediaService->like($userMedia, $data["isLiked"]);

        if($data["isLiked"] === true) {
            $this->userActivityService->createMediaActivity("like", $userMedia, $user, $media);
        }

        return $this->json([
            "message" => 'Action réalisée avec succès'
        ]);
    }

    #[Route('/watch', name: 'app_watch_media', methods: ['POST'])]
    public function watch(Request $request): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
          return $this->json([
                'message' => 'Utilisateur non trouvé'
            ]);  
        }

        $data = json_decode($request->getContent(), true);
        
        if (!isset($data["isWatched"], $data["tmdb"], $data["type"])) {
            return $this->json([
                'message' => 'Données manquantes'
            ], 400);            
        }

        // FindOrCreateMedia(id_media)  
        $media = $this->mediaService->findOrCreate($data["tmdb"], $data["type"]);
        // FindOrCreateUserMedia(id_user, id_media)
        $userMedia = $this->userMediaService->findOrCreate($user, $media);
        // changer property is_watched dans user_media
        $this->userMediaService->watch($userMedia, $data["isWatched"]);

        $this->userActivityService->createMediaActivity("watched", $userMedia, $user);

        return $this->json([
            "message" => "Action réalisée avec succès"
        ]);
    }

    #[Route('/rate', name: 'app_user_media_rate', methods: ['POST'])]
    public function rate(Request $request): JsonResponse
    {
        $user = $this->getUser();
        
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé'
            ]);  
        }

        $data = json_decode($request->getContent(), true);

        if(!isset($data["tmdb"], $data["type"], $data["rate"])) {
            return $this->json([
                'message' => 'Données manquantes',
                'results' => null
            ], 400);
        }

        $media = $this->mediaService->findOrCreate($data["tmdb"], $data["type"]);
        $userMedia = $this->userMediaService->findOrCreate($user, $media);

        $this->userMediaService->rate($userMedia, $data["rate"]);
        $this->userActivityService->createMediaActivity("rate", $userMedia, $user);


        return $this->json([
            'message' => 'Media noté avec succès',
            'results' => null
        ]);
    }
}
