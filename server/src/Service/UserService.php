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
}