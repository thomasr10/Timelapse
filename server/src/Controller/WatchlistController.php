<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\WatchlistService;
use App\Service\MediaService;
use App\Service\UserMediaService;
use App\Service\WatchlistMediaService;
use App\Service\UserActivityService;
use App\Service\UserService;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Exception\CircularReferenceException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('/api/watchlist')]
final class WatchlistController extends AbstractController
{
    public function __construct(
        private WatchlistService $watchlistService, 
        private MediaService $mediaService, 
        private WatchlistMediaService $watchlistMediaService, 
        private UserMediaService $userMediaService,
        private UserActivityService $userActivityService,
        private UserService $userService
    ){}

    #[Route('/create', name: 'app_watchlist', methods: ["POST"])]
    public function create(Request $request): JsonResponse
    {   
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé',
                'results' => null
            ], 404);
        }

        $data = json_decode($request->getContent(), true);

        if(!isset($data["title"], $data["isPublic"])) {
            return $this->json([
                'message' => 'Données manquantes'
            ], 400);
        }

        $watchlist = $this->watchlistService->create($data["title"], $data["description"], $data["isPublic"], $user);

        return $this->json([
            'message' => 'Watchlist créé avec succès',
            'results' => [
                "title" => $watchlist->getTitle(),
                "description" => $watchlist->getDescription(),
                "is_public" => $watchlist->isPublic(),
                "created_at" => $watchlist->getCreatedAt(),
                "updated_at" => $watchlist->getupdatedAt(),
                "user" => [
                    "id" => $user->getId(),
                    "username" => $user->getUsername(),
                    "display_username" => $user->getDisplayUsername(),
                ]
            ],
        ]);
    }

    #[Route('/user/{id}', name: "app_watchlist_all", methods: ["GET"])]
    public function getAllWatchlistOfUser(string $id): JsonResponse
    {   
        $user = $this->userService->findById(intval($id));

        $watchlists = $this->watchlistService->getAllWatchlistOfUser($user);

        if ($watchlists === null) {
            return $this->json([
                'message' => 'Aucune watchlist trouvée',
                'results' => null
            ]);
        }

        $watchlistArray = [];

        foreach($watchlists as $watchlist) {
            $watchlistArray[] = [
                "id" => $watchlist->getId(),
                "title" => $watchlist->getTitle(),
                "description" => $watchlist->getDescription(),
                "updated_at" => $watchlist->getUpdatedAt(),
                "count_media" => count($watchlist->getMedia()),
                "is_public" => $watchlist->isPublic()
            ];
        }

        return $this->json([
            'message' => 'Watchlists récupérées avec succès',
            'results' => $watchlistArray
        ]);
    }

    #[Route('/media/add', name: "app_watchlist_media_add", methods: ["POST"])]
    public function addMediaToWatchlist(Request $request): JsonResponse
    {
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);

        if (!isset($data["tmdb"], $data["watchlist_id"], $data["type"])) {
            return $this->json([
                'message' => 'Données manquantes'
            ], 400);
        }

        $media = $this->mediaService->findOrCreate($data["tmdb"], $data["type"]);
        $userMedia = $this->userMediaService->findOrCreate($user, $media);
        $insert = $this->watchlistMediaService->addMedia($media->getId(), $data["watchlist_id"]);
        
        // update watchlist
        $watchlist = $this->watchlistService->find($data["watchlist_id"]);
        $this->watchlistService->update($watchlist);


        if(gettype($insert) === 'string') {
            return $this->json([
                'message' => $insert,
                'results' => null
            ]);
        }

        // create recent activity
        $watchlist = $this->watchlistService->findById($data["watchlist_id"]);
        $this->userActivityService->createWatchlistActivity("watchlist", $watchlist, $user, $media, $userMedia);

        return $this->json([
            'message' => 'Media ajouté à la watchlist'
        ]);
    }
    
    #[Route('/media/delete', name: "app_watchlist_media_delete", methods: ["DELETE"])]
    public function deleteMediaToWatchlist(Request $request): JsonResponse
    {
        $user = $this->getUser();
        
        $data = json_decode($request->getContent(), true);

        if (!isset($data["tmdb"], $data["watchlist_id"], $data["type"])) {
            return $this->json([
                'message' => 'Données manquantes'
            ], 400);
        }

        $media = $this->mediaService->findOrCreate($data["tmdb"], $data["type"]);
        $this->watchlistMediaService->deleteMedia($media->getId(), $data["watchlist_id"]);

        return $this->json([
            'message' => 'Media supprimé de la watchlist'
        ]);
    }

    #[Route('/{id}', name: "app_watchlist_media_delete", methods: ["GET"])]
    public function fetchWatchlist(string $id): JsonResponse
    {
        $user = $this->getUser();

        $watchlist_id = intval($id);
        $watchlist = $this->watchlistService->findById($id);

        $media_id_array = $this->watchlistMediaService->findByWatchlistId($watchlist_id);
        $media_entity_array = [];

        foreach($media_id_array as $media) {
            $media = $this->mediaService->findById($media["media_id"]);
            $media_entity_array[] = [
                "tmdb_id" => $media->getTmdbId(),
                "type" => $media->getType()
            ];
        }

        return $this->json([
            'message' => 'Medias récupérés avec succès',
            'results' => [
                "medias" => $media_entity_array,
                "watchlist" => [
                    "id" => $watchlist->getId(),
                    "title" => $watchlist->getTitle(),
                    "description" => $watchlist->getDescription(),
                ]
            ]
        ]);
    }

    #[Route('/delete', name: 'app_delete_watchlist', methods: ['DELETE'])]
    public function deleteWatchlist(Request $request): JsonResponse
    {
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);

        if(!isset($data["id"])) {
            return $this->json([
                "message" => "Données manquantes",
                "results" => null
            ], 400);
        }

        $id = intval($data["id"]);

        $watchlist = $this->watchlistService->findById($id);
        $this->watchlistService->delete($watchlist);
    

        return $this->json([
            "message" => "Watchlist supprimé",
            "results" => null
        ]);
    }
}
