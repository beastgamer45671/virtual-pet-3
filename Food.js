class Food{
    constructor(){
        var foodStock, lastFed;
        this.image = loadImage("sprites/milk.png");
    }

    getFoodStock(x){
  x=x+1;
    }

    updateFoodStock(){
        foodStock.update();
    }
}

   deduceFood(x)
   {
   x=x-1;
   }

   bedroomi()
   {
       background(bedroom,550,500);
   }

   garden()
       {
       background(garden,550,500);
       }

   washroom()
   {
   background(washroom,550,500);
   }   
   

   display()
   {
       var x=80,y=100;

       imageMode(CENTER);
    image(this.image = loadImage,720,220,70,70);

    if(this.foodStock!=0){
        for(var i=0; i<this.foodStock; i++){
            if(1%10==0){
                x=80;
                y=y+50;  
            }
            image(image.Image,x,y,50,50);
            x=x+30;
        }
    }
}