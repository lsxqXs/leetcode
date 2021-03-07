package main

import (
	"fmt"
)

func main() {
	r := lemonadeChange([]int{5, 5, 10, 10, 20})
	fmt.Println(r)
}

func lemonadeChange(bills []int) bool {
	us5, us10 := 0, 0

	for _, val := range bills {

		if val == 5 {
			us5++
		} else if val == 10 {
			us10++
			us5--
		} else {
			if us10 > 0 && us5 > 0 {
				us10--
				us5--
			} else if us5 >= 3 {
				us5 -= 3
			} else {
				return false
			}
		}

		if us5 < 0 || us10 < 0 {
			return false
		}
	}

	return true
}
