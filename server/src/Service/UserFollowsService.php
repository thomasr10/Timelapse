<?php

namespace App\Service;

use App\Repository\UserFollowsRepository;
use App\Entity\UserFollows;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserFollowsService
{
    public function __construct(
        private UserFollowsRepository $userFollowsRepository,
        private EntityManagerInterface $em    
    ){}

        public function follow($user_follower, $user_to_follow)
    {   
        $is_existing = $this->userFollowsRepository->findOneByFollowerAndFollowing($user_follower, $user_to_follow);

        if ($is_existing) return;

        $user_follows = new UserFollows();
        $user_follows
            ->setFollower($user_follower)
            ->setFollowing($user_to_follow);

        $this->em->persist($user_follows);
        $this->em->flush();

        return $user_follows;
    }

    public function unfollow($user_unfollower, $user_to_unfollow): void
    {
        $user_follows = $this->userFollowsRepository->findOneByFollowerAndFollowing($user_unfollower, $user_to_unfollow);

        $this->em->remove($user_follows);
        $this->em->flush();
    }

    public function is_following(User $user, User $profile_user): bool
    {  
        $is_following = $this->userFollowsRepository->findOneByFollowerAndFollowing($user, $profile_user);

        return $is_following ? true : false;
    }
}