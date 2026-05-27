<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use App\Service\AuthService;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

final class AuthController extends AbstractController
{   
    public function __construct(private AuthService $authService){}

    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {   
        $data = json_decode($request->getContent(), true);

        if(!$data) {
            return $this->json([
                'message' => 'Tous les champs sont nécessaires'
            ], 400);
        }

        if (!isset($data['username'], $data['email'], $data['password'])) {
            return $this->json([
                'message' => 'Tous les champs sont nécessaires'
            ], 400);            
        }

        try {
            $this->authService->register($data);
        } catch (UniqueConstraintViolationException $e) {
            
            if(str_contains($e->getMessage(), 'user.UNIQ_IDENTIFIER_EMAIL')) {

                return $this->json([
                    'field' => 'email',
                    'message' => 'Adresse email déjà utilisée'
                ], 400);

            } else {

                return $this->json([
                    'field' => 'username',
                    'message' => 'Nom d\'utilisateur déjà utilisée'
                ], 400);
            }

        } catch(\InvalidArgumentException $e) {
            return $this->json([
                'message' => $e->getMessage()
            ], 400);
        }

        return $this->json([
            'message' => 'Utilisateur créé avec succès'
        ]);
    }

    #[Route('/api/me', methods: ['GET'])]
    public function me(): JSONResponse
    {
        $user = $this->getUser();
        $normalizer = new ObjectNormalizer();
        $encoder = new JsonEncoder();
        $serializer = new Serializer([$normalizer], [$encoder]);

        if(!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé'
            ], 401);
        }

        return $this->json([
            'message' => 'Utilisateur récupéré',
            'user' => $serializer->serialize($user, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['age']])
        ]);
    }

    #[Route('/api/logout', methods: ['GET'])]
    public function logout(): JsonResponse
    {
        $response = new JsonResponse(['message' => 'Utilisateur déconnecté avec succès']);
        $response->headers->clearCookie('token');
        return $response;
    }
}
