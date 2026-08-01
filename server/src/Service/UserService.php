<?php

namespace App\Service;

use App\Repository\UserRepository;
use App\Entity\User;

class userService
{
    public function __construct(
        private UserRepository $userRepository
    ){}
    
    public function searchByInputValue(string $value): array
    {
        return $this->userRepository->findByUsername($value);
    }

    public function searchByUsername(string $username): ?User
    {
        return $this->userRepository->findOneByUsername($username);
    }

    public function findById(int $id): ?User
    {
        return $this->userRepository->find($id);
    }

    public function follow($userFollower, $userToFollow): void
    {
        $this->userRepository->follow($userFollower, $userToFollow);
        return;
    }

    public function is_following(User $user, User $profile_user): bool
    {
        return $this->userRepository->is_following($user, $profile_user);
    }
}