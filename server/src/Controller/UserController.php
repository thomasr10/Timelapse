<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\UserActivityService;

#[Route('/api/user')]
final class UserController extends AbstractController
{
    public function __construct(private UserActivityService $userActivityService){}

    #[Route('/records', name: 'app_user_records', methods: ['GET'])]
    public function userRecords(): JsonResponse
    {
        $user = $this->getUser();

        if(!$user) {
            return $this->json([
                'message' => 'Utilisateur introuvable',
                'results' => null
            ]);
        }

        // Get user's watchlists
        $watchlists = [];

        foreach($user->getWatchlists() as $watchlist) {
            $medias = [];
            foreach($watchlist->getMedia() as $media) {
                $medias[] = [
                    "id" => $media->getId(),
                    "tmdb_id" => $media->getTmdbId(),
                    "type" => $media->getType()
                ];
            }

            $watchlists[] = [
                "title" => $watchlist->getTitle(),
                "description" => $watchlist->getDescription(),
                "created_at" => $watchlist->getCreatedAt(),
                "updated_at" => $watchlist->getUpdatedAt(),
                "medias" => [
                    "total" => count($watchlist->getMedia()),
                    "results" => $medias
                ]
            ];
        }

        // Get user's watched medias
        $watchedMediaTotal = 0;
        foreach($user->getUserMedia() as $userMedia) {
            if($userMedia->isWatched() === true) {
                $watchedMediaTotal ++;
            }
        }

        // Get user's recent activity
        $userRecentActivity = $this->userActivityService->userRecentActivity($user);
        $userRecentActivityArray = [];

        foreach($userRecentActivity as $recentActivity) {
            $userMedia = $recentActivity->getUserMedia();
            $media = $userMedia->getMedia();
            
            $userRecentActivityArray[] = [
                "id" => $recentActivity->getId(),
                "type" => $recentActivity->getType(),
                "created_at" => $recentActivity->getCreatedAt(),
                "user_media" => [
                    "id" => $userMedia->getId(),
                    "rating" => $userMedia->getRating(),
                    "media" => [
                        "tmdb" => $media->getTmdbId(),
                        "type" => $media->getType()
                    ]
                ]
            ];
        }

        return $this->json([
            "message" => "Records récupérés avec succès",
            "results" => [
                "watchlist" => $watchlists,
                "followers" => count($user->getUserFollows()),
                "watched_medias" => $watchedMediaTotal,
                "favorites_medias" => [],
                "recent_activity" => $userRecentActivityArray
            ],
        ]);
    }
}
