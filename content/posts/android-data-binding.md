---
title: Android Data Binding
date: 2019-03-17T19:31:20.591Z
---
### Android Data Binding : How to Integrate Into Existing App

Android Data Binding Library has been production ready for almost a year and you may be wondering if you can start using this great library in an existing project without introducing more bugs and without having to rewrite a lot of exiting code in your project. Yes you can, and its very easy to start! And why wouldn't you? Why wait to start a new project in few months or years and miss out on all the benefits of this library?! As the library offers significant time savings to developers and enforces good coding practices and as a result making your code cleaner and more maintainable. You can pull the the code for this tutorial [here](https://github.com/Code-Principles/AndroidDataBindingDemoApp).\
\
It is easy to begin. If your project is minimum API level 7 or higher and is using Android Plugin for Gradle 1.5.0-alpha1 or higher then you can simply enable the Data Binding library by adding the following to the app module's build.gradle file

```bash
android {
    ....
    dataBinding {
        enabled = true
    }
}
```

And that's it! Now you can start using the library.\
\
Say goodbye to findViewById() for ever!

How many hundreds or thousands of times have you typed findViewById in your lifetime and have accepted your fate as an Android developer to eternally writing findViewById over and over. Well fret no more as Android Data Binding Library comes to the rescue. And this is perhaps the easiest and fastest feature to implement out of the box and use in your existing project. Start by wrapping your layout in a `<layout>` tag and make sure the elements you need a reference to have an id attribute like so:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout>
    <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_height="match_parent"
        android:layout_width="match_parent">
        <TextView
            android:id="@+id/textView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" />
    </RelativeLayout>
</layout>
```

next in the activity instead of calling setContentView like we normally would, we just call DataBindingUtil.setContentView(activity, layoutId) that returns us a binding object named after our layout's file name (if our layout is activity_main.xml the binding object will be called ActivityMainBinding):

```java
public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding mBinding;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mBinding = DataBindingUtil.setContentView(this,R.layout.activity_main);
        mBinding.textView.setText("Hello Data Binding World!");
    }
}
```

And that's it! And we don't need to cast or store a reference and clutter our class with dozens of fields for countless TextViews, ImageViews or Buttons. How amazing is that?! ...What? You say are not impressed? But imagine that your layout has dozens of UI components and as long as you put an id attribute in the xml definition you can just get the view from the generated binding object, like the  ActivityMainBinding class in our example. So to summarize the steps:

1. Wrap xml root element in `<layout>` tag
2. Create a binding object
3. Use binding object to access views

But what if its a Fragment or a custom View you ask? Good question. If its a fragment or a view or anything that needs to be inflated you must use the generated binding object's inflate method like so:

```java
public class MainFragment extends Fragment {
    private FragmentMainBinding mBinding;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        mBinding = FragmentMainBinding.inflate(inflater,container,false);
        return mBinding.getRoot();
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mBinding.textView.setText("Hello From Fragment!");
    }
}
```

### Actual "Binding" of data and UI

Now lets take it up a notch. Here we will actually bind a model to our UI. In the next example we have a simple model that looks like this:

```java
public class ProductModel {
    public String name;
    public float price;
    public int quantity;
}
```

now lets create our layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout>
    <data>
        <variable
            name="productModel"
            type="com.codeprinciples.databindingdemo.model.ProductModel"/>
    </data>
    <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_height="match_parent"
        android:layout_width="match_parent">
        <TextView
            android:id="@+id/productName"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{productModel.name}"/>
        <TextView
            android:id="@+id/productPrice"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/productName"
            android:text="@{String.valueOf(productModel.price)}"/>
        <EditText
            android:id="@+id/productQuantity"
            android:layout_width="50dp"
            android:layout_height="wrap_content"
            android:layout_below="@id/productPrice"
            android:text="@{String.valueOf(productModel.quantity)}"/>

    </RelativeLayout>
</layout>
```

Wait a minute! Whats going on with the values for the text attributes in that layout? - you ask. Well notice the `<variable>` tag and the name and type attributes. That is how we tell the layout what model we will be using. And the `android:text="@{value}"` hold the field values from the model.\
\
Now to pass the model to the layout:

```java
mBinding.setProductModel(productModel);
```

Pretty simple right? Our binding object now has a setter with the name of the variable we defined in the layout's variable tag. So now instead of setting all the UI element's attribute values in your Activity of Fragment you can move this logic into the layout itself. This way you keep your UI logic separate from business or service logic. General rule is anything that is related to setting or updating the UI can be put in the xml file for example:

* setting text, backgrounds, colors based on model's values
* setting listeners for buttons, toggles, check boxes that update the model (through the presenter, more on this in next section)
* toggling visibility of UI elements depending on model's values

### Simpler event listeners!

Now what if the client tell us they want to have a BUY button on that page? How would we do that with data binding? Wait they also want an empty state AND load a product with a tap of a button?! Ha! Easy! First we want to add a reference to a presenter inside our xml. Using presenter is a good practice to separate event handling from our data. First lets declare an interface for our presenter.

```java
public interface ProductPresenter {
    void onProductBuyRequest(ProductModel productModel);
    void onProductLoadRequest();
}
```

\
Next lets implement our interface in our activity or on the class you have the reference to the binding object.

```java
@Override
public void onProductBuyRequest(ProductModel productModel) {
    mBinding.setProductModel(null);
    Toast.makeText(this, "Product purchased", Toast.LENGTH_SHORT).show();
}

@Override
public void onProductLoadRequest() {
    ProductModel productModel = new ProductModel("Banana",0.25f,300);
    mBinding.setProductModel(productModel);
}
```

Next in our xml we can declare the presenter.

```xml
<variable
  name="productPresenter"
  type="com.codeprinciples.databindingdemo.presenter.ProductPresenter"/>
```

Remember to set the presenter on the binding object with

```java
mBinding.setProductPresenter(this);
```

Now let's add a button to the layout.

```xml
<Button
            android:id="@+id/buyProductButton"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/productQuantity"
            android:text='@{productModel==null?"Load Model":"Buy Product"}'
            android:onClick="@{(v) -> productModel==null? productPresenter.onProductLoadRequest() : productPresenter.onProductBuyRequest(productModel)}"/>
```

As you can see we can have simple logic within the `@{...}`. Here if our model is null we set our button's text to "Load Model" and onClick listener to  productPresenter.onProductLoadRequest. But if the product model is not null we call productPresenter.onProductBuyRequest(productModel) with the instance of our current productModel.\
\
As you can tell more and more logic is added to our xml. But this is safe as it is UI specific logic and this helps keep our Activities and Fragments clean of clutter. Also our code is modular as the Presenter can be any class that implements that interface.

### Two-Way Observing the Observables.

How do you make the value from EditText update the model and if the model is updated internally UI to automatically updated? First of we need to make our model extend BaseObservable and create getters and setters that Data Binding library will use to set the text property of our EditText.

```java
public class ProductModel  extends BaseObservable {
    private String name;
    private float price;
    private int quantity;

    public ProductModel(String name, float price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    @Bindable
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        notifyPropertyChanged(BR.name);
    }

    @Bindable
    public String getPrice() {
        return AppUtils.moneyFormat(price);
    }

    public void setPrice(String price) {
        this.price = Float.valueOf(price.replace("$",""));
        notifyPropertyChanged(BR.price);
    }

    @Bindable
    public String getQuantity() {
        return String.valueOf(quantity);
    }

    public void setQuantity(String quantity) {
        try {
            this.quantity = Integer.valueOf(quantity);
            notifyPropertyChanged(BR.quantity);
        }catch (NumberFormatException e){
            Log.i("ProductModel", quantity+" is not a valid number");
        }

    }
}
```

Notice the @Bindable annotation marking the getter, in order to mark the getter for our fields so that the Data Binding library can find the methods. Also notice the notifyPropertyChanged() notifying the binding that the field value has changed. These changes are needed to automagically have a two way binding between UI and model. And finally update the xml UI elements.

```xml
<TextView
            android:id="@+id/productName"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@={productModel.name}"/>
        <TextView
            android:id="@+id/productPrice"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/productName"
            android:text="@={productModel.price}"/>
        <EditText
            android:id="@+id/productQuantity"
            android:layout_width="50dp"
            android:layout_height="wrap_content"
            android:layout_below="@id/productPrice"
            android:text="@={productModel.quantity}"/>
```

The only notable difference here is instead of `android:text="@{...}"` we use `android:text="@={...}"` in order to tell the library that this is a two way binding.

Results:

![results](/img/results_1.png "results")

### Conclusion

Basic usage of the Data Binding library is easy to begin using in your project. Advanced implementation will require some learning from you and other developers joining the project but is worth the time spent because the code maintainability will improve and will lead to cleaner code in the long run as well as faster development time once mastering all the features of this library.

### Resources and Further reading:

* [The source code for this tutorial](https://github.com/Code-Principles/AndroidDataBindingDemoApp)
* [Official Android Docs](https://developer.android.com/topic/libraries/data-binding/index.html)
* [Google I/O presentation video](https://www.youtube.com/watch?v=DAmMN7m3wLU)

### Liked this blog post? Want to learn more? 

Take my Udemy course on Android Data Binding [here](https://www.udemy.com/learn-android-master-data-binding/)