import { exec } from "child_process";

export async function setup(
  playbook: string,
  options: {
    repo_url: string;
    dest: string;
    site_dir: string;
    build_dir_name: string;
    become_password: string;
  }
) {
  const command = `ansible-playbook -e "
                   repo_url=${options.repo_url}
                   dest=${options.dest}
                   site_dir=${options.site_dir}
                   build_dir_name=${options.build_dir_name}
                   " ${playbook} --extra-vars "ansible-become-pass=${options.become_password}"`;

  const child_command = exec(command);

  child_command.stdout?.on("data", (data) => console.log("stdout: ", data));
  child_command.stderr?.on("data", (data) => console.log("stderr: ", data));
  child_command.on("close", (code) =>
    console.log("process exited with code: ", code)
  );
}
