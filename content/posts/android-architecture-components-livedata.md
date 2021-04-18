---
title: "Android Architecture Components : LiveData"
date: 2021-04-18T20:10:46.594Z
---
## Live Data : Life-cycle aware Observables

![hero](/img/live_datal_logo.png "hero")

\
As an Android developer you often have to work with data that is dynamic and changing with user input, device configuration changes, or even time changes. On top of this as a developer you have to respect the life-cycle of an Activity of Fragment that contains this dynamically changing data: stop updates onStop() or onPause() and restart the updates onStart() and onResume(). Examples of this is location data, countdown timers, user's list selections and any other type of dynamically changing data. Lets see how we can make these tasks easier using LiveData. We will demonstrate LiveData by creating a self contained timer.

### Subclass LiveData

```java
public class TimerLiveData extends LiveData<Long> {
    private static final long SECOND_AS_MILLI = 1000;
    private Handler handler;
    private Runnable runnable;
    private long secondsCount;
    private long secondsAtDeactivation;

    public TimerLiveData() {
        handler = new Handler();
        runnable = new Runnable() {
            @Override
            public void run() {
                setValue(++secondsCount);
                handler.postDelayed(this,SECOND_AS_MILLI);
            }
        };
    }

    @Override
    protected void onActive() {
        super.onActive();
        if(secondsAtDeactivation>0) //counts the time passed while inactive
            secondsCount += (System.currentTimeMillis() / SECOND_AS_MILLI - secondsAtDeactivation);
        handler.post(runnable);
    }

    @Override
    protected void onInactive() {
        super.onInactive();
        handler.removeCallbacks(runnable);
        secondsAtDeactivation = System.currentTimeMillis() / SECOND_AS_MILLI;
    }
}
```

LiveData object is set active when the observer's lifecycle is **stated** or **resumed**. And the LiveData object is set inactive when the observer's lifecycle is **stopped** or **pause**. In our TimerLiveData we start timer when onActive() is called and stop the timer when onInactive() is called. This way the observer only gets timer updates while it is active.

### Observe with LifecycleOwner

```java
public class HomeActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        TextView textView = findViewById(R.id.textView);
        TimerLiveData  timerLiveData = new TimerLiveData();
        timerLiveData.observe(this, integer -> textView.setText("Counter Time: " + integer + "s"));
    }
}
```

Instantiate the TimerLiveData object and then observe() in order to get callbacks on timer's value changes but only while our Activity is active.

### Benefits of using LiveData

* Makes objects life-cycle aware
* Keeps LiveData objects self contained
* Keeps Activitys and Fragments clean
* Eliminates memory leaks as LiveData objects clean up themselves.
* Observers instantly notified of value changes in LiveData

### Sources and further reading:

* [Github project with examples from this tutorial](https://github.com/Code-Principles/android-arch-comp-proj)
* [Official Android LiveData Docs](https://developer.android.com/topic/libraries/architecture/livedata.html)