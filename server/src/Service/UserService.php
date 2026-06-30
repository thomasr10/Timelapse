<?php

namespace App\Service;

use App\Repository\UserRepository;

class userService
{
    public function __construct(
        private UserRepository $userRepository
    ){}
    
    public function searchByInputValue(string $value): array
    {
        return $this->userRepository->findByUsername($value);
    }
}