---
title: "Android Architecture Components : Room Persistence Library"
date: 2021-04-18T19:58:46.463Z
---
## Room: a SQLite object mapping library

After many years and using countless 3rd party DAO libraries I am happy to finally introduce official Android solution to working with SQLite databases and it is called Room Persistence Library. Before we begin you can find code from this tutorial [here](https://github.com/Code-Principles/android-arch-comp-proj).

![hero](/img/desktoproom-2x.png "hero")

### SQL Review

* Data is stored in tables
* Table's rows contain entities
* Table's columns contain entity's fields
* Rows can have id's (primary keys) and id's must be unique
* You can create relationships between rows in different tables by referring to other row's id (foreign key)
* Index primary key columns for performance
* Use SQL queries to find sort and filter the data from tables

  ![sheet](/img/unnamed-1-.png "sheet")

### What is Room?

Room is a library that uses annotations in your Java data models and your data access objects (DAO's) to generate database schema (table definitions) and SQLite queries. So you don't have to write all the SQLite queries from scratch and have logic for storing and retrieving your models from database. All you need to do is annotate your models. Pretty simple right? Let's start.

### Key Components in Room

* Database Contains data from all the entities, and stored in tables
* Entity: Represents a class whose fields match to a database row
* DAO: Object through which we access entities in the database

## Entities:

Annotate your model classes with @Entity annotation. Annotate the model's fields with @PrimaryKey, and fields to ignore with @Ignore annotations. All other fields are persisted in the database by default but if you want to provide extra information like specify a column name you can use the @ColumnInfo annotation.

```java
@Entity
public class Movie {
    @PrimaryKey
    public int id;
    @ColumnInfo(name = "title")
    public String title;
}
```

## Data Access Objects (DAOs):

DAO classes let you insert, update, delete, and query the database. Annotate the DAO class with @Dao annotation. Annotate methods that add new models with @Insert annotation. Annotate methods that change existing models with @Update annotation. Annotate methods that delete existing models with @Delete annotation. And finally search for specific models with @Select annotation.

```java
@Dao
public interface MovieDao {
    @Query("SELECT * FROM movie")
    List<Movie> getAll();
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertAll(Movie... movies);
    @Delete
    void delete(Movie movie);
}
```

## Database:

Your database class is the point of access of all the DAO's you have defined. To create a database class you must subclass RoomDatabase class and also annotate it with @Database annotation where you reference the models you wish to be stored in this database.

```java
@Database(entities = {Movie.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase{
    private static  AppDatabase instance;
    public abstract MovieDao movieDao();
    public static AppDatabase getInstance(){
        if(instance==null){
            instance = Room.databaseBuilder(MyApplication.getAppContext(), 
                                            AppDatabase.class, "app-database")
                           .allowMainThreadQueries()
                           .build();
        }
        return instance;
    }
}
```

Notice the allowMainThreadQueries(). It is only needed if you will write to the database from main thread. This approach is not recommended.

## Threading:

Room library by default does not allow database writes from main thread as this could make UI slow and jittery as file writes are relatively slow. Therefore one way to do this correctly is using AsyncTask. Define custom AsyncTask Like so:

```java
class AppDatabaseTask extends AsyncTask<Void,Void,Void> {
    private Runnable action, completion;

    public void setAction(Runnable action) {
        this.action = action;
    }

    public void setCompletion(Runnable completion) {
        this.completion = completion;
    }

    @Override
    protected Void doInBackground(Void... params) {
        action.run();
        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        if(completion!=null)
            completion.run();
        super.onPostExecute(aVoid);
    }
}
```

Then use the task in our database class like so:

```java
@Database(entities = {Movie.class,  MovieSuggestion.class, Genre.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase{
    private static final String TAG = "AppDatabase";
    private static  AppDatabase instance;
    public abstract MovieDao movieDao();
    public AppDatabase(){
        Log.w(TAG, "use getInstance() instead!");
    }
    public static AppDatabase getInstance(){
        if(instance==null){
            instance = Room.databaseBuilder(MyApplication.getAppContext(),
                    AppDatabase.class, "app-database").build();
        }
        return instance;
    }
    public static void executeAsync(Runnable action, Runnable completion){
        AppDatabaseTask databaseTask = new AppDatabaseTask();
        databaseTask.setAction(action);
        databaseTask.setCompletion(completion);
        databaseTask.execute();
    }
    public static  void executeAsync(Runnable action){
        executeAsync(action,null);
    }
}
```

And finally use our database class:

```java
private void loadMovieDetails(int id) {
        ApiManager.getInstance().getMovie(id,
                obj -> AppDatabase.executeAsync(
                    () -> {
                        AppDatabase.getInstance().movieDao().insertAll(obj);
                        updateUI(obj);
                    },
                    () -> Log.i(TAG,"Finished writing to database.")),
                (code, msg) -> Log.e(TAG, "Failed loading movie details: " + msg));
    }
```

Here we load a Movie object from Api manager and on success we store it in the database by calling AppDatabase.executeAsync(). So the executeAsync() takes two Runnables. One for the action to perform and second to call when the action is complete.

### Sources and further reading:

* [Github project with examples from this tutorial](https://github.com/Code-Principles/android-arch-comp-proj)
* [Official Android Room Library Docs](https://developer.android.com/topic/libraries/architecture/room.html)

[](<>)