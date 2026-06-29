<?php

namespace App\Service;

use App\Entity\Review;
use App\Entity\Media;
use App\Entity\User;
use App\Repository\ReviewRepository;
use Doctrine\ORM\EntityManagerInterface;

class ReviewService
{
    public function __construct(private EntityManagerInterface $em, private ReviewRepository $reviewRepository){}

    public function create(string $content, Media $media, User $user): Review
    {
        $review = new Review();
        $review->setContent($content);
        $review->setMedia($media);
        $review->setUser($user);
        $review->setCreatedAt(new \DatetimeImmutable());
        
        $this->em->persist($review);
        $this->em->flush($review);

        return $review;
    }

    public function getReviews(Media $media, int $offset): array | null
    {
        return $this->reviewRepository->findByMediaWithOffset($media, $offset);
    }
}