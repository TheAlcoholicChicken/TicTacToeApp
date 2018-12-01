# Installation
Pre-requisites: Node.js and Mongo downloaded

1. Go into nodetest1 folder
2. Open cmd prompt
3. 'npm install'
4. 'npm start' to start Node

This will install everything in the packages.json file. This will make the node module folder that is specified in the .gitignore.

For this application to work, you must have Node running, as well as mongod.exe.  NOT mongo.exe, though. 

Open localhost:3000 to view what's there so far.
localhost:3000/newuser  to register yourself in the database.  
If success, it will take you to localhost:3000/userlist and you should be able to see yourself on there.

Make sure to restart Node anytime a change is made in the javascript. No need for Jade, just refresh the page.


# How to make your own db and populate it (better to open in notepad ++)
1. Make a directory called data. mine is in C: 
2. Go to your MongoDB/bin directory. mine was in: Program Files\MongoDB\Server\4.0\bin
3. Open cmd
4. Type this:  mongod.exe --dbpath "C:\data".
5. Now open another directory in your MongoDB\bin folder.
6. Type this: mongo.exe.  You will be typing in here.
7. type this:  use nodetest1
8. Copy this in, then press enter. After this, you can type db.Player.find().pretty() to view.
```
db.Player.insert([
   {
      user_id: '3877f888adaf', 
      core_app_id: null, 
      data: 	
         {
            username:'user1',
            email: '123@1234.com',
            password: '123456',
			highscore: 50,
			best_ranking: 3 
         }
   },
   {
      user_id: '228f888vfaf', 
      core_app_id: null, 
      data: 	
         {
            username:'user2',
            email: 'admin@admin.com',
            password: '123456',
			highscore: 65,
			best_ranking: 2 
         }
   },
   {
      user_id: '8643f878fjus', 
      core_app_id: null, 
      data: 	
         {
            username:'user3',
            email: 'help@me.com',
            password: '123456',
			highscore: 66,
			best_ranking: 1 
         }
   },
   {
      user_id: '7543f888dfhy', 
      core_app_id: null, 
      data: 	
         {
            username:'user4',
            email: 'rabbits@RABBITS.com',
            password: '123456',
			highscore: 49,
			best_ranking: 4 
         }
   },
   {
      user_id: '8743f823av7f', 
      core_app_id: null, 
      data: 	
         {
            username:'user5',
            email: '420@420.com',
            password: '123456',
			highscore: 44,
			best_ranking: 5 
         }
   }
])
```

# Running the API with Postman
![postman](https://github.com/TheAlcoholicChicken/HangmanApp/blob/master/images/postmanapi.PNG?raw=true)
