# mrBlob
An animated wiggly "blob" shape to use in your page.  
You can try it out and play around with it here: https://znicolez.github.io/mrBlob/  

## Preview:  
![Mr  blob](https://github.com/ZNicoleZ/mrBlob/assets/80704425/a3117d00-b816-46a2-b085-265e82d4b799)

## Description:  
The shape is formed by applying a sine function (with the parameters below) on the perimeter of a base circle. The sine fuction is then updated each frame to create the animation of a floating blob. Below are parameters that affect the sine function and the shape's movement across the screen.  
### Parameters:
- **wave:** update blob shape movement (sine function)  
- **wave_speed:** wave update speed  (how wiggly is the shape movement)
- **diameter:** inner circle diameter  
- **radius:** inner circle radius  
- **bumps:** number of "bumps" (better if integer)  
- **roughness:** how small are the "bumps" (smaller - smoother, larger - rougher)  
- **color:** blob inner or outer color (depends on inverse)  
- **inverse:** inverse = 0: the blob is filled, inverse = 1: the blob is empty (the outside is colored)  
- **blobX:** shape's center X position value  
- **blobY:** shape's center Y position value  
- **enterFrom:** offset for entering from the bottom/side of the canvas  
- **rise_speed:** how fast does the shape move across the screen  
- **horizontal:** horizontal = 0: move vertically, horizontal = 1: move horizontaly    
- **stop:** switch between moving the shape and keeping it still  
