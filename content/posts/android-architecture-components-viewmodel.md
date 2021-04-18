---
title: "Android Architecture Components : ViewModel"
date: 2021-04-18T20:20:47.617Z
---
## ViewModel : UI-Related Data Object

One of the biggest challenges for an Android developer is keeping data across configuration changes such as screen rotation or during the recreation of Activity/Fragments after it's been destroyed and recreated by the framework. Luckily the new Android Architecture Components library has ViewModel class that is intended to store and manage UI-related data so that the data survives configuration changes. 

![hero](img/view_model_logo.png "hero")

### Benefits

* Keeps data across UI recreation
* No need to repeat API calls and Database queries on UI recreation 
* Keeps Activity/Fragments clean since work is now delegated to ViewModels
* Share ViewModels between Fragments

### Subclass ViewModel

```java
public class TimerViewModel extends ViewModel {
    private TimerLiveData timerLiveData;
    public TimerLiveData getTimer(){
        if(timerLiveData == null)
            timerLiveData = new TimerLiveData();
        return timerLiveData;
    }
}
```

To create a view-model just subclass ViewModel. View-models are responsible to provide data and keep reference to it. Our TimerViewModel lazily initializes TimerLiveData which is a LiveData implementation of a timer that counts seconds, read more about TimerLiveData and what exactly LiveData is used for in my post [here](http://www.codeprinciples.com/2017/09/android-architecture-components-livedata.html).

### Access And Observe

```java
public class HomeActivity extends AppCompatActivity {
    private TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        textView = findViewById(R.id.textView);
        TimerViewModel timerViewModel = ViewModelProviders.of(this).get(TimerViewModel.class);
        timerViewModel.getTimer().observe(this, integer -> textView.setText("Counter Time: " + integer + "s"));
    }
}
```

Now the Activity (or Fragments) can access this view-model via ViewModelProviders.of() function that takes Activity or Function that will become the owner of the view-model. Because our TimerLiveData is an observable, we can subscribe for value changes (that happen every second) and then update text view. To share a view-model between Fragments use getActivity() in ViewModelProviders.of() to get view-model owned by the parent Activity.

### Results

![results](img/ezgif-4-cfded55b0e.gif "results")

### Sources and further reading:

* [Github project with examples from this tutorial](https://github.com/Code-Principles/android-arch-comp-proj)
* [Official Android ViewModel Docs](https://developer.android.com/topic/libraries/architecture/viewmodel.html)