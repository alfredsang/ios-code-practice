require 'wxruby'
include Wx
class MyFrame < Frame
   def initialize(title)
     super(nil, -1, title)
     Button.new(self, -1, "Hello, I'm a Button")
   end
end
class MyApp < App
   def on_init
     frame = MyFrame.new('Simple wxRuby App')
     frame.show
   end
end
a = MyApp.new
a.main_loop
