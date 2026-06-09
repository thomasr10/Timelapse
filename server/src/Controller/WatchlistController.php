<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\WatchlistService;

#[Route('/api/watchlist')]
final class WatchlistController extends AbstractController
{
    public function __construct(private WatchlistService $watchlistService){}

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

        if(!isset($data["title"], $data["description"], $data["isPublic"])) {
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
}
