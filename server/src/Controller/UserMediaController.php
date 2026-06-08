<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\UserMediaService;
use App\Service\MediaService;

#[Route('/api')]
final class UserMediaController extends AbstractController
{   

    public function __construct(private UserMediaService $userMediaService, private MediaService $mediaService){}

    #[Route('/user_media/{type}/{tmdb_id}', name: 'app_user_media', methods: ['GET'])]
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

        $media = $this->mediaService->findMedia($type, $tmdb);

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
}
