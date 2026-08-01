<?php

namespace App\Repository;

use App\Entity\UserActivity;
use App\Entity\UserFollows;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserActivity>
 */
class UserActivityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserActivity::class);
    }

       /**
        * @return UserActivity[] Returns an array of UserActivity objects
        */
       public function findByUser(User $user): array
       {
           return $this->createQueryBuilder('u_a')
               ->andWhere('u_a.user = :user')
               ->setParameter('user', $user)
               ->orderBy('u_a.id', 'DESC')
               ->setMaxResults(10)
               ->getQuery()
               ->getResult()
           ;
       }

       public function findFollowingActivity(User $user): array
       {
            return $this->createQueryBuilder('u_a')
                ->join(UserFollows::class, 'u_f', 'WITH', 'u_a.user = u_f.following')
                ->andWhere('u_f.follower = :follower')
                ->setParameter('follower', $user)
                ->orderBy('u_a.id', 'DESC')
                ->setMaxResults(10)
                ->getQuery()
                ->getResult();
       }

    //    public function findOneBySomeField($value): ?UserActivity
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
