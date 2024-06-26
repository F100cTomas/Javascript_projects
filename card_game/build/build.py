from os import system, path, walk

def build_file(dir: str, name: str) -> None:
    system(rf"{dir}\build\wat2wasm.exe {dir}\wat\{name}.wat -o {dir}\{name}.wasm")

def main() -> None:
    dir = path.dirname(path.dirname(__file__))
    _, _, filenames = next(walk(f"{dir}\wat"))
    for name in filenames:
        build_file(dir, name.removesuffix(".wat"))
        print(f"Built file: {name}")
        

if __name__ == "__main__":
    main()