(module
  (import "console" "log" (func $log (param $num i32)))
  (import "console" "write" (func $write (param $str i32) (param $length i32)))
  (import "js" "memory" (memory 1))
  (data (i32.const 0) "Hello ")
  (data (i32.const 7) "World!")
  (func $strlen (param $str i32) (result i32) (local $ptr i32)
    local.get $str
    local.set $ptr
    (loop $loop
      local.get $ptr
      i32.load8_u
      i32.const 0
      i32.ne
      (if (then
        local.get $ptr
        i32.const 1
        i32.add
        local.set $ptr
        br $loop)))
    local.get $ptr
    local.get $str
    i32.sub)
  (func $puts (param $str i32)
    local.get $str
    local.get $str
    call $strlen
    call $write)
  (func $strcpy (param $dst i32) (param $src i32) (local $char i32)
    (loop $loop
      local.get $dst
      local.get $src
      i32.load8_u
      local.tee $char
      i32.store8
      local.get $char
      i32.const 0
      i32.ne
      (if (then
        local.get $dst
        i32.const 1
        i32.add
        local.set $dst
        local.get $src
        i32.const 1
        i32.add
        local.set $src
        br $loop))))
  (func $strcat (param $dst i32) (param $src i32)
    (loop $loop
      local.get $dst
      i32.load8_u
      i32.const 0
      i32.ne
      (if (then
        local.get $dst
        i32.const 1
        i32.add
        local.set $dst
        br $loop)))
    local.get $dst
    local.get $src
    call $strcpy)
  (func $main (export "main") (result i32) (local i32)
    i32.const 14
    i32.const 0
    call $strcpy
    i32.const 14
    i32.const 7
    call $strcat
    i32.const 14
    call $puts
    i32.const 0))