<?php

namespace App\Service;

use App\Repository\UserRepository;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Utils\PasswordUtils;

class UserService
{
    public function __construct(
        private UserRepository $userRepository,
        private EntityManagerInterface $em,
        private PasswordUtils $passwordUtils
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
    
    public function deleteAccount(User $user): void
    {
        $this->em->remove($user);
        $this->em->flush();
        return;
    }

    public function updateUser(User $user, string $email, string $display_username, ?string $password): User
    {
        $user->setEmail($email)
            ->setDisplayUsername($display_username);
        
        if ($password !== null) {

            if (strlen($password) < 12) {
                throw new \InvalidArgumentException('Votre mot de passe doit contenir au moins 12 caractères');
            }
            if (!preg_match('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$/', $password)) {
                throw new \InvalidArgumentException('Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial');
            }
            $hashed_password = $this->passwordUtils->hashPassword($user, $password);
            $user->setPassword($hashed_password);
        }

        $this->em->flush();
        return $user;
    }

}