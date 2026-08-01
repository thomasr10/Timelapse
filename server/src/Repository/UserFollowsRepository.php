<?php

namespace App\Repository;

use App\Entity\UserFollows;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserFollows>
 */
class UserFollowsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserFollows::class);
    }

    //    /**
    //     * @return UserFollows[] Returns an array of UserFollows objects
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

        public function findOneByFollowerAndFollowing(User $user_follower, User $user_followed): ?UserFollows
       {
           return $this->createQueryBuilder('u')
               ->andWhere('u.follower = :user_follower')
               ->setParameter('user_follower', $user_follower)
               ->andWhere('u.following = :user_followed')
               ->setParameter('user_followed', $user_followed)
               ->getQuery()
               ->getOneOrNullResult()
           ;
       }
}
