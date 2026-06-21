<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\MediaService;
use App\Service\ReviewService;

#[Route('/api/review')]
final class ReviewController extends AbstractController
{   
    public function __construct(private MediaService $mediaService, private ReviewService $reviewService){}

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
            ]);
        }

        $media = $this->mediaService->findOrCreate($data["tmdb"], $data["type"]);
        $this->reviewService->create($data["content"], $media, $user);

        return $this->json([
            'message' => 'Review créée avec succès',
            'results' => null
        ]);
    }
}
