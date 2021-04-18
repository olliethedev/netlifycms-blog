---
title: Android Architecture Components and Data Binding
date: 2021-04-18T21:02:26.062Z
---
## Lifecycle awareness!

Finally Android Data Binding library got updated to play nice with Android Architecture Components library and became life-cycle aware! This means that any changes to the **LiveData** objects will be reflected in the layouts... automagically! :)\

* Tested on Android Studio 3.1 - canary 6

## Whats new?

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMainBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        binding.setLifecycleOwner(this);
        final MainViewModel vm = ViewModelProviders.of(this).get(MainViewModel.class);
        binding.setViewModel(vm);
        if(vm.userModel.getValue() == null){ // initial value
            vm.userModel.setValue(new UserModel("Ollie"));
        }
    }
}
```

To make the binding life-cycle aware you need to pass the life-cycle owner to the **ViewDataBinding** by calling the setLifecycleOwner method.

## The ViewModel:

```java
public class MainViewModel extends ViewModel {
    public MutableLiveData<UserModel> userModel = new MutableLiveData<>();
    public void onSaveUserData(){
        userModel.setValue(userModel.getValue());
    }
}
```

Our view model consists of the **LiveData** object that is simply and observable data container, where the observer gets notified of data changes.

## The model:

```java
public class UserModel {
    public String name;

    public UserModel(String name) {
        this.name = name;
    }
}
```

Our model has one field that is used to store user's name. A POJO.

## The layout:

```java
<layout ...>
    <data>
        <variable
            name="viewModel"
            type="...MainViewModel" />
    </data>
    <android.support.constraint.ConstraintLayout
        ...>

        <TextView
            ...
            android:text='@{"user name: "+viewModel.userModel.name }'
            ... />

        <EditText
            ...
            android:text="@={viewModel.userModel.name}"
            ... />

        <Button
            ...
            android:onClick="@{()->viewModel.onSaveUserData() }"
            ... />

    </android.support.constraint.ConstraintLayout>
</layout>
```

* Out layout consists of a text field that is bound to the user's name. And will be updated when our **LiveData** container posts a change.
* We also have an **EditText** that is two-way bound to the user's name, meaning when text gets entered, the name is updated and vise-versa, when the user **LiveDate** is updated the **EditText** is updated.
* And finally a button onClick of which we post a change to our **LiveData** and all the observers get notified.

  ## The result:

  ![result](img/ezgif-5-a842fa6408.gif "result")



  #### Resources:

  * Full source for the project: [here](https://github.com/Code-Principles/NewStudioTestApplication)