<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\UserActivityService;

#[Route('/api/user/activity')]
final class UserActivityController extends AbstractController
{
    public function __construct(private UserActivityService $userActivityService){}

    #[Route('/followed_users', name: 'app_followed_user_activity', methods: ['GET'])]
    public function recentActivities(): JsonResponse
    {   
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non trouvé',
                'results' => null
            ], 400);
        }

        $recent_activities = $this->userActivityService->findFollowingActivity($user);

        if (!$recent_activities) {
            return $this->json([
                'message' => 'Aucune activité récupérée',
                'results' => null,
            ]);   
        }

        return $this->json([
            'message' => 'Activité récupérée',
            'results' => $recent_activities,
        ]);

    }
}
