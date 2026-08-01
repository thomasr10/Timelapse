<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\UserFollowsService;
use App\Service\UserService;
use App\Service\UserActivityService;

#[Route('/api')]
class UserFollowsController extends AbstractController
{
    
    public function __construct(
        private UserFollowsService $userFollowsService,
        private UserService $userService,
        private UserActivityService $userActivityService
    ){}

    // follow user
    #[Route('/follow', methods: ['POST'], name: 'app_user_follow')]
    public function follow(Request $request): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé',
                'results' => null
            ], 400);
        }

        $data = json_decode($request->getContent(), true);
        $user_to_follow = $this->userService->findById($data['id']);

        if (!$user_to_follow) {
            return $this->json([
                'message' => 'Utilisateur à suivre non trouvé'
            ], 400);
        }

        $user_follows = $this->userFollowsService->follow($user, $user_to_follow);
        $this->userActivityService->createFollowActivity('follow', $user, $user_follows);

        return $this->json([
            'message' => 'Vous avez suivi' . ' ' . $user_to_follow->getUsername(),
            'results' => null
        ]);
        
    }

    // unfollow user
    #[Route('/unfollow', methods: ['DELETE'], name: 'app_user_unfollow')]
    public function unfollow(Request $request): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé',
                'results' => null
            ], 400);
        }

        $data = json_decode($request->getContent(), true);
        $user_to_unfollow = $this->userService->findById($data['id']);

        if (!$user_to_unfollow) {
            return $this->json([
                'message' => 'Utilisateur à suivre non trouvé'
            ], 400);
        }

        $this->userFollowsService->unfollow($user, $user_to_unfollow);

        return $this->json([
            'message' => 'Vous avez arrêté de suivre' . ' ' . $user_to_unfollow->getUsername(),
            'results' => null
        ]);
        
    }

    // check if a user is following another user
    #[Route('/is_following/{userId}', name: 'app_user_follows', methods: ['GET'])]
    public function isFollowing(string $userId): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé',
                'results' => null
            ], 400);
        }
        
        $profile_user = $this->userService->findById(intval($userId));
        $is_following = $this->userFollowsService->is_following($user, $profile_user);

        return $this->json([
            'message' => 'Requête exécutée avec succès',
            'results' => $is_following
        ]);
        
    }
}