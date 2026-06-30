<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\UserActivityService;
use App\Service\UserService;

#[Route('/api/user')]
final class UserController extends AbstractController
{
    public function __construct(
        private UserActivityService $userActivityService,
        private UserService $userService
    ){}

    #[Route('/{id}/records', name: 'app_user_records', methods: ['GET'])]
    public function userRecords(string $id): JsonResponse
    {
        $user = $this->userService->findById(intval($id));

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
            $media = $recentActivity->getMedia();
            $watchlist = $recentActivity->getWatchlist();
            $review = $recentActivity->getReview();

            $userRecentActivityArray[] = [
                "id" => $recentActivity->getId(),
                "type" => $recentActivity->getType(),
                "created_at" => $recentActivity->getCreatedAt(),
                "user_media" => $userMedia ? [
                    "id" => $userMedia->getId(),
                    "rating" => $userMedia->getRating(),
                ] : null,
                "media" => $media ? [
                    "tmdb_id" => $media->getTmdbId(),
                    "type" => $media->getType()
                ] : null,
                "watchlist" => $watchlist ? [
                    "id" => $watchlist->getId(),
                    "title" => $watchlist->getTitle(),
                    "description" => $watchlist->getDescription()
                ] : null,
                "review" => $review ? [
                    "content" => $review->getContent()
                ] : null
            ];
        }

        return $this->json([
            "message" => "Records récupérés avec succès",
            "results" => [
                "watchlist" => $watchlists,
                "followers" => count($user->getUserFollows()),
                "review_count" => count($user->getReviews()),
                "watched_medias" => $watchedMediaTotal,
                "favorites_medias" => [],
                "recent_activity" => $userRecentActivityArray
            ],
        ]);
    }

    #[Route('/username/{username}', name: 'app_user', methods: ['GET'])]
    public function searchUserByUsername(string $username): JsonResponse
    {
        if(!isset($username)) {
            return $this->json(["message" => "Valeur manquante lors de la recherche", "results" => null], 400);
        }

        $user = $this->userService->searchByUsername($username);

        return $this->json([
            "message" => "Utilisateurs récupérés avec succès",
            "results" => $user ? [
                "id" => $user->getId(),
                "username" => $user->getUsername(),
                "display_username" => $user->getDisplayUserName(),
                "profile_picture" => $user->getProfilePicture()
            ] : null
        ]);
    }

    #[Route('/search/{search}', name: 'app_user_search', methods: ['GET'])]
    public function searchUser(string $search): JsonResponse
    {
        if(!isset($search)) {
            return $this->json(["message" => "Valeur manquante lors de la recherche", "results" => null], 400);
        }

        $users = $this->userService->searchByInputValue($search);

        $userArray = [];

        foreach($users as $user) {
            $userArray[] = [
                "id" => $user->getId(),
                "username" => $user->getUsername(),
                "display_name" => $user->getDisplayUserName(),
                "profile_picture" => $user->getProfilePicture()
            ];
        }

        return $this->json([
            "message" => "Utilisateurs récupérés avec succès",
            "results" => $userArray
        ]);
    }
}