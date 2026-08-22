<?php

namespace App\Utils;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;
use Psr\Log\LoggerInterface;

class PasswordUtils
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher,
        private LoggerInterface $logger,
    ){}

    public function hashPassword(User $user, string $clear_password): ?string
    {
        try {
            return $this->passwordHasher->hashPassword($user, $clear_password);

        } catch (\Throwable $e) {
            $this->logger->error('Erreur lors du hash du mot de passe.', [
                'message' => $e->getMessage(),
                'exception' => $e,
            ]);

            return null;
        }
    }
}