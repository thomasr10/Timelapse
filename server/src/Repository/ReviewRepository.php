<?php

namespace App\Repository;

use App\Entity\Review;
use App\Entity\Media;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Review>
 */
class ReviewRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Review::class);
    }

    //    /**
    //     * @return Review[] Returns an array of Review objects or null
    //     */
       public function findByMediaWithOffset(Media $media, int $offset): ?array
       {
           return $this->createQueryBuilder('r')
               ->andWhere('r.media = :media')
               ->setParameter('media', $media)
               ->orderBy('r.id', 'ASC')
               ->setFirstResult($offset)
               ->setMaxResults(10)
               ->getQuery()
               ->getResult()
           ;
       }

    //    public function findOneBySomeField($value): ?Review
    //    {
    //        return $this->createQueryBuilder('r')
    //            ->andWhere('r.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
