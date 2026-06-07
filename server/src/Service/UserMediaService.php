<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Media;
use App\Entity\UserMedia;
use App\Repository\UserMediaRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserMediaService
{   
    public function __construct(private UserMediaRepository $userMediaRepository, private EntityManagerInterface $em){}

    public function findOrCreate(User $user, Media $media): UserMedia
    {
        $userMedia;
        $userMedia = $this->userMediaRepository->findByUserIdAndMediaId($user, $media);

        if (!$userMedia) {
            $userMedia = new UserMedia();
            $userMedia->setUser($user);
            $userMedia->setMedia($media);
            $userMedia->setIsLiked(false);
            $userMedia->setIsWatched(false);
            $userMedia->setRating(null);
            $userMedia->setWatchedAt(new \DateTimeImmutable());
            $this->em->persist($userMedia);
            $this->em->flush();
        }

        return $userMedia;
    }

    public function like(UserMedia $userMedia, bool $isLiked): void
    {
        $userMedia->setIsLiked($isLiked);
        $this->em->persist($userMedia);
        $this->em->flush();
        return;
    }

    public function findUserMedia(User $user, Media $media): ?UserMedia
    {
        $user_media = $this->userMediaRepository->findUserMediaByUserTypeTmdb($user, $media);
        return $user_media;
    }
}