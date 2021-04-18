---
title: "Android Data Binding : Dynamic RecyclerView Adapter"
date: 2021-04-08T02:24:53.928Z
---
One of the most common list design patterns that I encounter as Android developer is a list with a variation of the following:

* Multiple row types. 
* Expandable/Collapsible rows or sections. 
* Load more/Scroll to load more. 
* Delete rows/Sections. 

\
And all of these can be implemented in a generic manner with Android Data Binding library. You can write one adapter for all the **RecycleView**s in your app and use it to render all the common design patterns. Check out the source for the example in this tutorial [here](https://github.com/Code-Principles/Advanced-Android-Data-Binding-Dynamic-List-Adapter).\
\
Final result:

![result](/img/ezgif-4-19e52bb548.gif "result")

Lets begin by defining our adapter:

```java
public class RecyclerViewBindingAdapter extends RecyclerView.Adapter<RecyclerViewBindingAdapter.BindingViewHolder> {
    private ObservableList<AdapterDataItem> data;

    public RecyclerViewBindingAdapter(ObservableList<AdapterDataItem> data) {
        this.data = data;
        data.addOnListChangedCallback(new ObservableListCallback());
    }

    @Override
    public BindingViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new BindingViewHolder(DataBindingUtil.inflate(LayoutInflater.from(parent.getContext()),viewType,parent,false));
    }

    @Override
    public void onBindViewHolder(BindingViewHolder holder, int position) {
        AdapterDataItem dataItem = data.get(position);
        for(Pair<Integer, Object> idObjectPair: dataItem.idModelPairs){
            holder.bind(idObjectPair.first, idObjectPair.second);
        }
        holder.binding.executePendingBindings();
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    @Override
    public int getItemViewType(int position) {
        return data.get(position).layoutId;
    }


    private class ObservableListCallback extends  ObservableList.OnListChangedCallback<ObservableList<RecyclerViewBindingAdapter.AdapterDataItem>>{...}


    public class BindingViewHolder extends RecyclerView.ViewHolder{...}

    public static class AdapterDataItem {...}
}
```

The **RecyclerViewBindingAdapter** simply inflates each view type that is a **layoutId**. Next it binds all the variables to the appropriate models.

```java
public class AdapterDataItem {
    public int layoutId;
    List<Pair<Integer, Object>> idModelPairs;
    ...
}
```

The **AdapterDataItem** model contains layout id field and a list of integer - object pairs. The reason for this is because any layout with data binding can have multiple variables and for dynamic variable bindings we need to know those variable ids for each layout in order to pass the data models from the code.

```java
public class BindingViewHolder extends RecyclerView.ViewHolder{
    private ViewDataBinding binding;

    public BindingViewHolder(ViewDataBinding binding) {
        super(binding.getRoot());
        this.binding=binding;
    }

    public void bind(int varId, Object obj){
        this.binding.setVariable(varId, obj);
    }
}
```

The **BindingViewHolder** class simply holds reference of the binding and provides the bind() method to bind the layout variables to models.

```java
private class ObservableListCallback extends  ObservableList.OnListChangedCallback<ObservableList<RecyclerViewBindingAdapter.AdapterDataItem>>{

        @Override
        public void onChanged(ObservableList<AdapterDataItem> sender) {
            notifyDataSetChanged();
        }

        @Override
        public void onItemRangeChanged(ObservableList<AdapterDataItem> sender, int positionStart, int itemCount) {
            notifyItemRangeChanged(positionStart, itemCount);
        }

        @Override
        public void onItemRangeInserted(ObservableList<AdapterDataItem> sender, int positionStart, int itemCount) {
            notifyItemRangeInserted(positionStart, itemCount);
        }

        @Override
        public void onItemRangeMoved(ObservableList<AdapterDataItem> sender, int fromPosition, int toPosition, int itemCount) {
            notifyDataSetChanged(); // not sure how to notify adapter of this event
        }

        @Override
        public void onItemRangeRemoved(ObservableList<AdapterDataItem> sender, int positionStart, int itemCount) {
            notifyItemRangeRemoved(positionStart, itemCount);
        }
    }
```

The **ObservableListCallback** class is a wrapper to automatically provide notification of change in our data to the adapter.\
\
Next let's create an Presenter interface to help us keep the event handling separate from ui logic.

```java
public interface ListItemsPresenter {
    void onClick(ItemModel itemModel);
    void onClick(SubItemModel subItemModel);
    void onDeleteClick(ItemModel itemModel);
    void onExpandClick(ItemModel itemModel);
    void onLoadMoreClick();
}
```

Next up lets create some custom attributes for RecyclerView:

```java
public class AttributeBindingsAddapter {
    @BindingAdapter({"bind:list","bind:layoutManager","bind:itemAnimator"})
    public static void setList(RecyclerView rv, ObservableList dataItems, RecyclerView.LayoutManager layoutManager, RecyclerView.ItemAnimator itemAnimator){
        if(rv.getLayoutManager()==null)
            rv.setLayoutManager(layoutManager);
        if(rv.getAdapter() ==null)
            rv.setAdapter(new RecyclerViewBindingAdapter(dataItems));
        if(rv.getItemAnimator() == null)
            rv.setItemAnimator(itemAnimator);
    }
}
```

Custom attributes for **RecyclerView** allow us to set the adapter, layout manager and item animator in the xml binding definition butare not necessary as you can just set these properties normally from code.\
\
Lets take a look at a couple of our layouts:\
**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <data>
        <variable
            name="modelList"
            type="android.databinding.ObservableList"/>
        <variable
            name="listLayoutManager"
            type="android.support.v7.widget.RecyclerView.LayoutManager"/>
        <variable
            name="itemAnimator"
            type="android.support.v7.widget.RecyclerView.ItemAnimator"/>
    </data>
    <android.support.v7.widget.RecyclerView
        ...
        app:list="@{modelList}"
        app:layoutManager="@{listLayoutManager}"
        app:itemAnimator="@{itemAnimator}"/>
</layout>
```

Here we define the bindings for the **RecyclerView**'s custom attributes.\
\
**layout_item.xml**

```xml
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <data>
        <variable
            name="itemModel"
            type="com.codeprinciples.advancedadapterexample.models.ItemModel"/>
        <variable
            name="itemPresenter"
            type="com.codeprinciples.advancedadapterexample.presenters.ListItemsPresenter"/>
    </data>
    <LinearLayout
        ...
        android:onClick="@{(v) -> itemPresenter.onClick(itemModel)}">
        <TextView
            ...
            android:text="@{itemModel.item}"/>
        <ImageView
            ...
            android:onClick="@{(v) -> itemPresenter.onDeleteClick(itemModel)}"/>
        <ImageView
            android:onClick="@{(v) -> itemPresenter.onExpandClick(itemModel)}"/>

    </LinearLayout>
</layout>
```

Here we set the data bindings for the row's text content and on click handling. We also have couple more layouts such as header layout, sub item layout, loading layout, and load more layout, that our list will use but they are omitted as you are encouraged to create your own to see the flexibility of our dynamic adapter.\
\
Finally we can create our Activity:

```java
public class MainActivity extends AppCompatActivity implements ListItemsPresenter{
    private ActivityMainBinding mBinding ;
    private ObservableList<RecyclerViewBindingAdapter.AdapterDataItem> listItems;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mBinding= DataBindingUtil.setContentView(this, R.layout.activity_main);
        mBinding.setListLayoutManager(new LinearLayoutManager(this,LinearLayoutManager.VERTICAL,false));
        mBinding.setModelList(initList());
        mBinding.setItemAnimator(new DefaultItemAnimator());
        loadDataWithDelay(1500);
    }

    private ObservableList initList() {
        listItems = new ObservableArrayList<>();
        listItems.add(new RecyclerViewBindingAdapter.AdapterDataItem(R.layout.layout_heading, new Pair<Integer, Object>(BR.headingModel, new HeadingModel("Content Heading"))));
        listItems.add(new RecyclerViewBindingAdapter.AdapterDataItem(R.layout.layout_loading));
        return listItems;
    }

    private void loadDataWithDelay(int delayMilli) {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                listItems.addAll(listItems.size()-1,getItems());//insert before loading cell
                listItems.remove(listItems.size()-1);//remove loading cell
                listItems.add(new RecyclerViewBindingAdapter.AdapterDataItem(R.layout.layout_load_more, new Pair<Integer, Object>(BR.presenter,MainActivity.this)));
            }
        },delayMilli);
    }
...
}
```

The **MainActivity** class initializes the list with a header row and a loading (progress bar) row. Then to simulate network load delay after 1.5 seconds we add some content items below the header and replace loading row to a "Load More" row. All the changes to the **ObservableList listItems** list are automatically updated in the adapter as it is registered to observe for changes in our collection.\
\
And the **ListItemPresenter** interface is implemented by **MainActivity** like so:

```java
public class MainActivity extends AppCompatActivity implements ListItemsPresenter{
    ...
    @Override
    public void onClick(ItemModel itemModel) {
        Toast.makeText(this, "itemModel clicked", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onClick(SubItemModel subItemModel) {
        Toast.makeText(this, "subItemModel clicked", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDeleteClick(ItemModel itemModel) {
        if(itemModel.expanded)
            onExpandClick(itemModel);
        listItems.remove(Utils.convert(itemModel, this));
    }

    @Override
    public void onExpandClick( ItemModel itemModel) {
        itemModel.expanded = !itemModel.expanded;
        RecyclerViewBindingAdapter.AdapterDataItem item = Utils.convert(itemModel, this);
        if(itemModel.expanded) {
            listItems.addAll(listItems.indexOf(item)+1, getSubItems(itemModel));
        }else {
            int index = listItems.indexOf(item)+1;
            listItems.subList(index, index + itemModel.subItemModels.size()).clear();
        }
    }

    @Override
    public void onLoadMoreClick() {
        listItems.remove(listItems.size()-1);//remove load more cell
        listItems.add(new RecyclerViewBindingAdapter.AdapterDataItem(R.layout.layout_loading)); //add loading cell
        loadDataWithDelay(1500);
    }
}
```

The callbacks of the **ListItemPresenter** implementation allows us to handle row deletion,expanding rows, and appending more rows simply by inserting or deleting items in our **ObservableList listItems** and again any list changes are automatically reflected in the adapter.\
\
Results:

![result](/img/ezgif-4-19e52bb548.gif "result")

### Sources and further reading:

* [GitHub project for code in this tutorial](https://github.com/Code-Principles/Advanced-Android-Data-Binding-Dynamic-List-Adapter)
* [Official Android Data Binding docs](https://developer.android.com/topic/libraries/data-binding/index.html)
* [Simple Dynamic List Adapter and other cool Android Data Binding tricks](http://www.codeprinciples.com/2017/08/android-data-binding-ticks-and-magic.html)
* [Getting Started with Android Data Binding in existing project](http://www.codeprinciples.com/2017/08/test-title-1.html)

### Liked this blog post? Want to learn more? 

Take my Udemy course on Android Data Binding [here](https://www.udemy.com/learn-android-master-data-binding/):

![data binding](/img/3792356_cda7.jpeg "data binding")