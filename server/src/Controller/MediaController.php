<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Service\MediaService;
use App\Service\UserMediaService;

#[Route('/api')]
final class MediaController extends AbstractController
{   
    public function __construct(private MediaService $mediaService, private UserMediaService $userMediaService){}

    #[Route('/media/like', name: 'app_like_media', methods: ["POST"])]
    public function likeMedia(Request $request): JsonResponse
    {   
        $user = $this->getUser();
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé'
            ]);
        }

        $data = json_decode($request->getContent(), true);

        if (!$data["isLiked"] || !$data["idMedia"] || !$data["type"]) {
            return $this->json([
                'message' => 'Données manquantes'
            ],);
        }

        // FindOrCreateMedia(id_media)
        $media = $this->mediaService->findOrCreate($data["idMedia"], $data["type"]);
        // FindOrCreateUserMedia(id_user, id_media)
        $userMedia = $this->userMediaService->findOrCreate($user, $media);
        // changer property is_liked dans user_media
        $this->userMediaService->like($userMedia, $data["isLiked"]);

        return $this->json([
            "message" => 'Action réalisée avec succès'
        ]);
    }
}
