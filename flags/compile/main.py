import json
from collections import OrderedDict
from PIL import Image

with open("nuts.json") as fh:
	countries = json.load(fh)
images = OrderedDict()
for country in countries:
	images[country] = Image.open("png100px/" + country.lower() + ".png")
widths, heights = zip(*(i.size for f,i in images.items()))

width = 100
total_width = sum(widths)
height = min(heights)

new_im = Image.new('RGBA', (total_width, height))
cssstr = """
.flag{{width:{}px; height:{}px;background: url(flags.png)}}
.flag-xs{{zoom:0.25;-moz-transform:scale(0.25);-moz-transform-origin: 0 0;}}
.flag-sm{{zoom:0.50;-moz-transform:scale(0.50);-moz-transform-origin: 0 0;}}
.flag-lg{{zoom:2.00;-moz-transform:scale(2.00);-moz-transform-origin: 0 0;}}
""".format(str(width), str(height), str(height/4), str(width/4), str(height/4), str(height/2), str(width/2), str(height/2), str(height*2), str(width*2), str(height*2))

i = 0
for country, im in images.items():
	im2 = im.resize((width, height), Image.ANTIALIAS)
	x_offset = i * im2.size[0]
	new_im.paste(im2, (x_offset,0))
	cssstr += ".flag-"+country.lower()+"{"+"background-position: -"+str(x_offset)+"px 0px"+"}"+"\n"
	i += 1

new_im.save('../flags.png')

with open("../flags.css", "w") as fh:
	fh.write(cssstr)
