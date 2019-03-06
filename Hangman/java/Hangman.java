import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
import java.util.stream.Collectors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Hangman {
    public static List<String> word = new ArrayList<>();
    public static int wordl = 0;
    public static List<String> obfWord = new ArrayList<>();
    public static List<String> playedLetters = new ArrayList<>();
    public static int guessesRemaining = 8;
    public static final String[] words = { "javascript", "java", "python", "typescript", "hangman", "programmer",
            "developer", "coder", "github", "google", "terminal", "machine", "scripting", "server", "program", "array",
            "bytecode", "command", "function", "constructor", "arguments", "visual", "variable", "source" };
    public static Random rand = new Random();
    public static Pattern pattern = Pattern.compile("^[a-z]{1}$");
    public static Matcher matcher;
    public static Scanner scanner;

    public static void main(String[] args) {
        System.out.println(clr("\n     Hangman", "green"));
        System.out.println(clr("\n ++++++++++++++++++++++++++++++\n", "blue"));
        initGame();
        System.out.println(clr(" " + String.join(" ", obfWord) + "\n", "cian"));
        System.out.print(clr(" Guess letter: ", "yellow"));
        scanner = new Scanner(System.in);
        String data = scanner.nextLine();
        check(data.trim().toLowerCase());
    }

    public static void check(String data) {
        matcher = pattern.matcher(data);
        // matcher.lookingAt());
        if (matcher.matches()) {
            if (playedLetters.indexOf(data) >= 0) {
                System.out.println(clr("\n The letter you wrote was already played!", "red"));
            } else {
                playedLetters.add(data);
                if (word.indexOf(data) >= 0) {
                    for (var i = 1; i < word.size() - 1; i++) {
                        if (word.get(i).equals(data)) {
                            obfWord.set(i, word.get(i));
                            wordl--;
                        }
                    }
                    if (wordl < 1) {
                        System.out.println(clr("\n " + String.join(" ", obfWord), "cian"));
                        System.out.println(clr("\n ++++++++++++++++++++++++++++++", "blue"));
                        System.out.println(clr("\n  You won!\n", "green"));
                        System.exit(0);
                    }
                } else {
                    guessesRemaining -= 1;
                }
                if (guessesRemaining < 1) {
                    System.out.println(clr("\n " + String.join(" ", obfWord) + "\n", "cian"));
                    System.out.println(clr("\n ++++++++++++++++++++++++++++++", "blue"));
                    System.out.println(clr("\n  You lose! \n", "red"));
                    System.out.println(clr("  The word was: " + String.join("", word) + "\n", "red"));
                    System.exit(0);
                }
            }
        } else {
            System.out.println(clr("\n Write just one character!", "red"));
        }
        System.out.println(clr("\n " + String.join(" ", obfWord) + "\n", "cian"));
        System.out.println(clr(" " + guessesRemaining + " guesses remaining", "green"));
        System.out.println(clr(" Letters already played: " + String.join(", ", playedLetters), "green"));
        System.out.println(clr("\n ++++++++++++++++++++++++++++++\n", "blue"));
        System.out.print(clr(" Guess letter: ", "yellow"));
        data = scanner.nextLine();
        check(data);
    }

    public static String randWord() {
        return words[rand.nextInt(words.length)];
    }

    public static void initGame() {
        word = Arrays.stream(randWord().split("")).collect(Collectors.toList());
        wordl = word.size() - 2;
        obfWord.add(word.get(0));
        for (int i = 1; i < word.size() - 1; i++) {
            obfWord.add("_");
        }
        obfWord.add(word.get(word.size() - 1));
    }

    public static String clr(String text, String color) {
        switch (color) {
        case "red":
            text = "\033[1;91m" + text + "\033[0m";
            break;
        case "green":
            text = "\033[1;92m" + text + "\033[0m";
            break;
        case "blue":
            text = "\033[0;34m" + text + "\033[0m";
            break;
        case "cian":
            text = "\033[0;96m" + text + "\033[0m";
            break;
        case "yellow":
            text = "\033[1;93m" + text + "\033[0m";
            break;
        }
        return text;
    }

}