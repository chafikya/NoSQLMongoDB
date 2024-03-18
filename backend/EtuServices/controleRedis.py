# -*- coding: utf-8 -*-
import sys

import redis
def verifier_connexions(user_id):
    r = redis.StrictRedis(host='localhost', port=6379, db=0)
    key = f"user:{user_id}:connexions"
    if r.incr(key) <= 10:
        if r.ttl(key) == -1:  
            r.expire(key, 600)  # Expire après 600 secondes (10 minutes)
        return True 
    else:
        return False

    
    

if __name__ == "__main__":
    user_id=sys.argv[1]
    success = verifier_connexions(user_id)
    if success:
        print("Connexion autorisee")
    else:
        print("Limite de connexions atteinte")