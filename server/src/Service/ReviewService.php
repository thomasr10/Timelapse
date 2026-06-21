<?php

namespace App\Service;

use App\Entity\Review;
use App\Entity\Media;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class ReviewService
{
    public function __construct(private EntityManagerInterface $em){}

    public function create(string $content, Media $media, User $user): void
    {
        $review = new Review();
        $review->setContent($content);
        $review->setMedia($media);
        $review->setUser($user);
        $review->setCreatedAt(new \DatetimeImmutable());
        
        $this->em->persist($review);
        $this->em->flush($review);

        return;
    }
}