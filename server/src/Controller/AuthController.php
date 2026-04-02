<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use App\Service\AuthService;

final class AuthController extends AbstractController
{   
    public function __construct(private AuthService $authService){}

    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {   
        $data = json_decode($request->getContent(), true);

        if(!$data) {
            return $this->json([
                'success' => false,
                'error' => 'Tous les champs sont nécessaires'
            ], 400);
        }

        if (!isset($data['username'], $data['email'], $data['password'])) {
            return $this->json([
                'success' => false,
                'error' => 'Tous les champs sont nécessaires'
            ], 400);            
        }

        try {
            $this->authService->register($data);
        } catch (UniqueConstraintViolationException $e) {

            $message = str_contains($e->getMessage(), 'user.UNIQ_IDENTIFIER_EMAIL') ? 'Adresse email déjà utilisé' : 'Nom d\'utilisateur déjà utilisé';

            return $this->json([
                'success' => false,
                'message' => $message
            ], 409);

        } catch(\InvalidArgumentException $e) {
            return $this->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }

        return $this->json([
            'success' => true,
            'message' => 'Utilisateur créé avec succès'
        ]);
    }
}
