(module
  (import "memory" "mem" (memory $memory 0))
  (import "jscall" "write" (func $write (param $str i32) (param $length i32)))
  (func $puts (export "puts") (param $str i32)
    local.get $str
    local.get $str
    call $strlen
    call $write)
  (func $strlen (export "strlen") (param $str i32) (result i32) (local $ptr i32)
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
  (func $strcpy (export "strcpy") (param $dst i32) (param $src i32) (local $char i32)
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
  (func $strcat (export "strcat") (param $dst i32) (param $src i32)
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
    call $strcpy))