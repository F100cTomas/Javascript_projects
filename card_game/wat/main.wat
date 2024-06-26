(module
  (import "memory" "mem" (memory $memory 0))
  (import "utils" "puts" (func $puts (param $str i32)))
  (data (i32.const 0) "Hello World!")
  (func $main (export "main") (result i32) (local i32)
    i32.const 0
    call $puts
    i32.const 0))