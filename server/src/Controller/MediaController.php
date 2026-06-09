<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Service\MediaService;
use App\Service\UserMediaService;

#[Route('/api/media')]
final class MediaController extends AbstractController
{   
    public function __construct(private MediaService $mediaService, private UserMediaService $userMediaService){}

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
            ]);
        }

        // FindOrCreateMedia(id_media)
        $media = $this->mediaService->findOrCreate($data["tmdb"], $data["type"]);
        // FindOrCreateUserMedia(id_user, id_media)
        $userMedia = $this->userMediaService->findOrCreate($user, $media);
        // changer property is_liked dans user_media
        $this->userMediaService->like($userMedia, $data["isLiked"]);

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
            ]);            
        }

        // FindOrCreateMedia(id_media)  
        $media = $this->mediaService->findOrCreate($data["tmdb"], $data["type"]);
        // FindOrCreateUserMedia(id_user, id_media)
        $userMedia = $this->userMediaService->findOrCreate($user, $media);
        
        $this->userMediaService->watch($userMedia, $data["isWatched"]);

        return $this->json([
            "message" => "Action réalisée avec succès"
        ]);
    }
}
