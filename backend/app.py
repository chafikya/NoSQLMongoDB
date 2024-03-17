import redis
import time
import sys

# Connect to Redis
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

def register_user(username, name, surname, phone, email, password):
    user_data = { 
        'name': name,
        'surname': surname,
        'phone': phone,
        'email': email,
        'password': password,
    }
    redis_client.hmset(username, user_data)

def update_user_info(username, new_data):
    redis_client.hmset(username, new_data)

def delete_user(username):
    redis_client.delete(username)

def authorize_user_connection(user_id):
    now = int(time.time())
    conn_key = f"user:{user_id}:connections_timestamp"

    # Check recent connections in the last 10 minutes
    recent_connections = redis_client.zcount(conn_key, now - 600, now)
    
    # Get the current number of connections for this user
    current_connections = int(redis_client.get(f"user:{user_id}:connections") or 0)

    if recent_connections >= 10:
        # Deny connection if the user has already had 10 connections or more in the last 10 minutes
        return False
    else:
        # Authorize the connection
        # Increment the number of connections for this user
        redis_client.incr(f"user:{user_id}:connections")
        # Update the hash set with the new number of connections
        redis_client.hset("connected_users", user_id, current_connections + 1)
        # Add the timestamp of the current connection
        redis_client.zadd(conn_key, {now: now})
        redis_client.expire(conn_key, 600)  # Expire after 10 minutes
        return True

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_id = sys.argv[1]
        if authorize_user_connection(user_id):
            print("Connection authorized.")
        else:
            print("Connection denied.")
    else:
        print("Missing user ID.")
