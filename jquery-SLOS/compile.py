from jsmin import jsmin

jsfile = ""

programs = ['explorer', 'redirect']

with open('slos.js') as js_file:
	jsfile = js_file.read()

for program in programs:
	jsfile += "\n"
	with open('programs/'+program+".js") as js_file:
		jsfile += js_file.read()

with open('slos.min.js', "w") as js_file:
	minified = jsmin(jsfile)
	js_file.write(minified)
