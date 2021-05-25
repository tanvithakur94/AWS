git status /*to check the current status */

git remote -v /*to see the curent remote attached */
git remote add master URL /*master is the branch and URL is remote url*/

git pull origin master  --allow-unrelated-histories /*origin is remote branch :: master is local branch*/
OR
git pull origin master /*origin is remote branch :: master is local branch*/ 

git add . /*. is to add everything*/
git commit -m "initial commit message" 

git push master origin /*origin is remote branch :: master is local branch*/ 
 