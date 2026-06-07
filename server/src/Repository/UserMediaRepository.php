<?php

namespace App\Repository;

use App\Entity\UserMedia;
use App\Entity\User;
use App\Entity\Media;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserMedia>
 */
class UserMediaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserMedia::class);
    }

    /**
     * @return Media or null
     */
    public function findByUserIdAndMediaId(User $user, Media $media): ?UserMedia
       {
           return $this->createQueryBuilder('um')
               ->andWhere('um.user = :user')
               ->andWhere('um.media = :media')
               ->setParameter('user', $user)
               ->setParameter('media', $media)
               ->getQuery()
               ->getOneOrNullResult()
           ;
       }

    public function findUserMediaByUserTypeTmdb(User $user, Media $media): ?UserMedia
       {
           return $this->createQueryBuilder('um')
               ->andWhere('um.user = :user')
               ->andWhere('um.media = :media')
               ->setParameter('user', $user)
               ->setParameter('media', $media)
               ->getQuery()
               ->getOneOrNullResult()
           ;
       }

    //    /**
    //     * @return UserMedia[] Returns an array of UserMedia objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

}
