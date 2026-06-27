<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\UserMedia;
use App\Entity\UserActivity;
use App\Repository\UserActivityRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserActivityService
{
    public function __construct(
        private EntityManagerInterface $em, 
        private UserActivityRepository $userActivityRepository
    ){}

    public function createMediaActivity(string $type, UserMedia $userMedia, User $user): void
    {
        $userActivity = new UserActivity();
        $userActivity->setType($type);
        $userActivity->setUserMedia($userMedia);
        $userActivity->setUser($user);
        $userActivity->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($userActivity);
        $this->em->flush();
        return;
    }

    public function userRecentActivity(User $user)
    {
        return $this->userActivityRepository->findByUser($user);
    }
}