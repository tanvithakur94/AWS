class Solution {
    public:
    int consecutiveNumbersSum(int N) {
        int ans = 0;
        for (int i = 1; N > 0; N-=i, i++)
            ans += (N % i == 0);
        return ans;

    }
    S=15
    print(Solution.consecutiveNumbersSum(S))
