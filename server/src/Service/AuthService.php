<?php

namespace App\Service;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AuthService
{   
    public function __construct(private UserPasswordHasherInterface $userPasswordHasher, private EntityManagerInterface $entityManager, private ValidatorInterface $validator)
    {}

    public function register(array $data): User
    {
        if (strlen($data['password']) < 12) {
            throw new \InvalidArgumentException('Votre mot de passe doit contenir au moins 12 caractères');
        }
        if (!preg_match('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$/', $data['password'])) {
            throw new \InvalidArgumentException('Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial');
        }
        $user = new User();
        $user->setUsername($data['username']);
        $user->setDisplayUsername($data['username']);
        $user->setEmail($data['email']);
        $user->setPassword($this->userPasswordHasher->hashPassword($user, $data['password']));
        $user->setRoles(['ROLE_USER']);
        $user->setProfilePicture('/img/user-profile-1.png');
        $user->setCreatedAt(new \DateTimeImmutable());

        $errors = $this->validator->validate($user);

        if(count($errors) > 0) {
            $messages = [];
            foreach($errors as $error) {
                $messages[] = $error->getMessage();
            }
            throw new \InvalidArgumentException(implode('', $messages));
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;

    }
}