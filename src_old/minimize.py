import sys
from jsmin import jsmin
from os import listdir
from os.path import isfile, join

VERSION = '2.0.8'

copy = f"// Rajs.min.js v{VERSION}, a small library for everything. check out https://github.com/oboforty/Rajs \n\n"
content = ""
for f in listdir("src/"):
	filename = "src/" + f
	if isfile(filename):
		with open(filename, "r") as fh:
			content += fh.read()

print("Writing files...")
with open('ra.min.js', 'w') as fh:
	min1 = jsmin(content)
	min1 = copy + min1.replace("\n", " ")
	fh.write(min1)
