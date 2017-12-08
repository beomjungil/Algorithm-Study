const NeedlemanWunsch = (str1, str2) => {

    // Set Scores
    const MatchScore = 2, GapScore = -2, MissScore = -1, gc = '-';

    // Generate grid matrixay
    let matrix = [], i, j, str1Length, str2Length;

    // Cache string.length For 'for'
    [str1Length, str2Length] = [str1.length, str2.length];

    // Init Matrix
    for (i = 0; i < str1Length + 1; i++) {
        matrix[i] = [];
        for (j = 0; j < str2Length + 1; j++) {
            matrix[i][j] = undefined;
        }
    }

    // Set Matrix[0][0] = 0
    matrix[0][0] = 0;

    // Init First row, col
    for (j = 1; j <= str2Length; j++) {
        matrix[0][j] = GapScore << j - 1; // x * y == x << y-1 (Shift is Faster!)
        for (i = 1; i <= str1Length; i++) {
            matrix[i][0] = GapScore << i - 1;
        }
    }

    // Fill Matrix
    for (i = 1; i <= str1Length; i++) {
        matrix[i][0] = matrix[i - 1][0] + -2;
        for (j = 1; j <= str2Length; j++) {
            matrix[i][j] = Math.max(matrix[i - 1][j - 1] + (str2[j - 1] == str1[i - 1] ? MatchScore : MissScore), // Diagonal Cell
                Math.max(matrix[i - 1][j] + GapScore,                                              // Upper Cell
                    matrix[i][j - 1] + GapScore                                               // Side Cell
                )
            );
        }
    }

    // Cache string.length For 'while'
    [str1Length, str2Length] = [str1.length, str2.length];

    // Set Matrix[0][0] = 0
    let sq1 = [], sq2 = [];

    // Find Route And Align Strings

    while (str2Length > 0 || str1Length > 0) {
        let upperCell, sideCell, diagonalCell, answer;

        str1Length - 1 < 0 && str2Length > 0 ? upperCell = -999 : upperCell = matrix[str1Length - 1][str2Length];

        str2Length - 1 < 0 && str1Length > 0 ? sideCell = -999 : sideCell = matrix[str1Length][str2Length - 1];

        str1Length - 1 < 0 || str2Length - 1 < 0 ? diagonalCell = -999 : diagonalCell = matrix[str1Length - 1][str2Length - 1];

        answer = Math.max(upperCell, Math.max(sideCell, diagonalCell));

        switch (str2[str2Length - 1] === str1[str1Length - 1] ? diagonalCell : answer) {
            case upperCell: {
                sq1.push(str1[str1Length - 1]);
                sq2.push(gc);
                str1Length--;

                break;
            }
            case sideCell: {
                sq1.push(gc);
                sq2.push(str2[str2Length - 1]);
                str2Length--;
                break;
            }
            case diagonalCell: {
                sq1.push(str1[str1Length - 1]);
                sq2.push(str2[str2Length - 1]);
                str1Length--;
                str2Length--;
                break;
            }
        }
    }

    return [sq1.reverse(), sq2.reverse()];

};