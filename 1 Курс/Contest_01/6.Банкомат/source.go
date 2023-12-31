package main
import "fmt"

func main() {
    var (
        N int // денежная сумма
        k5000 int = 0 // наминал купюры 5000
        k1000 int = 0 // наминал купюры 1000
        k500 int = 0 // наминал купюры 500
        k200 int = 0 // наминал купюры 200
        k100 int = 0 // наминал купюры 100
    )
    
    fmt.Scan(&N)
    // Подсчет колличества купюр от остатка
    for ; N / 5000 > 0; {
        N = N - 5000
        k5000++
    }
    for ; N / 1000 > 0; {
        N = N - 1000
        k1000++
    }
    for ; N / 500 > 0; {
        N = N - 500
        k500++
    }
    for ; N / 200 > 0; {
        N = N - 200
        k200++
    }
    for ; N / 100 > 0; {
        N = N - 100
        k100++
    }
    
    fmt.Print(k5000, k1000, k500, k200, k100)
}
